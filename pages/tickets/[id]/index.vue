<template>
  <div class="container mx-auto p-4">
    <Card>
      <CardHeader>
        <div class="flex justify-between items-start">
          <div>
            <CardTitle class="text-2xl font-bold flex items-center gap-2">
              <Icon class="h-6 w-6" name="streamline:ticket-1" />

              {{ ticket.title }}
            </CardTitle>
            <p class="text-sm text-muted-foreground mt-1">
              {{ new Date(ticket.created_at).toLocaleString() }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Badge
              :variant="ticket.status === 'open' ? 'outline' : 'destructive'"
              >{{ ticket.status }}</Badge
            >
          </div>
        </div>
      </CardHeader>
      <CardContent class="space-y-4">
        <div>
          <h3 class="font-semibold mb-2">Description</h3>
          <p>{{ ticket.description }}</p>
        </div>
        <div>
          <h3 class="font-semibold mb-2">Tags</h3>
          <div class="flex flex-wrap gap-2">
            <Badge v-for="tag in ticket.tags" :key="tag" variant="default">{{
              tag
            }}</Badge>
          </div>
        </div>
        <hr />
        <div>
          <h3 class="font-semibold mb-2">Comments</h3>
          <ScrollArea class="max-h-[400px] pr-4">
            <div class="space-y-4">
              <div
                v-if="ticket.comments.length > 0"
                v-for="comment in ticket.comments"
                :key="comment.id"
                :class="
                  cn(
                    'flex',
                    comment.isCurrentUser ? 'justify-end' : 'justify-start'
                  )
                "
              >
                <div
                  :class="
                    cn(
                      'flex gap-3 max-w-[80%]',
                      comment.isCurrentUser && 'flex-row-reverse'
                    )
                  "
                >
                  <div
                    :class="
                      cn(
                        'flex flex-col',
                        comment.isCurrentUser ? 'items-end' : 'items-start'
                      )
                    "
                  >
                    <div
                      :class="
                        cn(
                          'rounded-lg p-3 text-xs text-bold',
                          !comment.isCurrentUser ? 'bg-gray-300' : 'bg-gray-200'
                        )
                      "
                    >
                      <p>{{ comment.content }}</p>
                    </div>
                    <p class="text-xs text-muted-foreground mt-1">
                      {{ new Date(comment.created_at).toLocaleString() }}
                    </p>
                  </div>
                </div>
              </div>
              <div v-else>
                <p class="text-xs text-gray-500 font-bold">
                  No comments yet. Be the first to add a comment!
                </p>
              </div>
            </div>
          </ScrollArea>
        </div>
        <form @submit="handleAddComment" class="space-y-2">
          <FormField v-slot="{ componentField }" name="newComment">
            <FormItem class="space-y-2">
              <FormLabel>Add Comment</FormLabel>
              <FormControl>
                <Textarea
                  id="newComment"
                  v-model="newComment"
                  placeholder="Add a comment..."
                  class="min-h-[100px]"
                  required
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <Button type="submit" class="w-full">
              <MessageCircle class="mr-2 h-4 w-4" />
              <Icon class="mr-2 h-4 w-4" name="carbon:add-comment" />
              Add Comment
            </Button>
          </FormField>
        </form>
      </CardContent>
      <CardFooter class="flex justify-between">
        <Button variant="outline" @click="goToEditTicket"> Edit Ticket </Button>
        <Button
          v-if="ticket.status === 'open'"
          variant="destructive"
          @click="handleCloseTicket"
        >
          <Icon class="mr-2 h-4 w-4" name="carbon:close-outline" />
          Close Ticket
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  layout: "auth",
});

import { cn } from "@/lib/utils";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

const config = useRuntimeConfig();
const apiUrl = config.public.API_URL;
const route = useRoute();
const jwt = useCookie("jwt");

const { data: ticket, refresh: refreshTicketData } = useFetch(
  `${apiUrl}/tickets/${route.params.id}`,
  {
    onRequest({ options }) {
      options.headers.set("Authorization", `Bearer ${jwt.value}`);
    },
  }
);

const goToEditTicket = () => {
  navigateTo(`/tickets/${route.params.id}/edit`);
};

const formSchema = toTypedSchema(
  z.object({
    newComment: z.string().nonempty("Comment is required"),
  })
);

const commentsForm = useForm({
  validationSchema: formSchema,
});

const handleAddComment = commentsForm.handleSubmit(async (values) => {
  const { newComment } = values;
  await $fetch(`${apiUrl}/tickets/${route.params.id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.value}`,
    },
    body: JSON.stringify({ content: newComment }),
  });

  commentsForm.resetForm();
  commentsForm.resetField("newComment");
  await commentsForm.validate();

  refreshTicketData();
});
</script>
