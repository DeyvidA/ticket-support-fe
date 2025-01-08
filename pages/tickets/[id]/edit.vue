<template>
  <client-only>
    <div class="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle class="text-2xl font-bold flex items-center gap-2">
            <Icon class="h-6 w-6" name="streamline:ticket-1" />
            <span>Edit Ticket</span>
          </CardTitle>
        </CardHeader>
        <form @submit="onSubmit">
          <CardContent class="space-y-4">
            <FormField v-slot="{ componentField }" name="title">
              <FormItem class="space-y-2">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter ticket title"
                    required
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="description">
              <FormItem class="space-y-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    placeholder="Enter ticket description"
                    required
                    class="resize-none"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="priority">
              <FormItem class="space-y-2">
                <FormLabel>Priority</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="option in priorityOptions"
                        :key="option"
                        :value="option"
                      >
                        {{ option }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="tags">
              <FormItem class="space-y-2">
                <FormLabel>Tags</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tag" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="bug">Bug</SelectItem>
                      <SelectItem value="feature">Feature</SelectItem>
                      <SelectItem value="enhancement">Enhancement</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </FormField>
          </CardContent>
          <CardFooter>
            <Button type="submit" class="w-full">Update Ticket</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  </client-only>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  layout: "auth",
});

const route = useRoute();
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const config = useRuntimeConfig();
const apiUrl = config.public.API_URL;
const jwtCookies = useCookie("jwt");

const priorityOptions = ["low", "medium", "high"];

const schema = toTypedSchema(
  z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().nonempty("Description is required"),
    priority: z.string().nonempty("Priority is required"),
    tags: z.string().nonempty("Tags is required"),
  })
);

const { data: ticket } = await useFetch(
  `${apiUrl}/tickets/${route.params.id}`,
  {
    onRequest({ request, options }) {
      const jwtCookies = useCookie("jwt");
      options.headers.set("Authorization", `Bearer ${jwtCookies.value}`);
    },
  }
);

const form = useForm({
  validationSchema: schema,
  initialValues: {
    title: ticket?.value?.title || "",
    description: ticket?.value?.description || "",
    priority: ticket?.value?.priority || "",
    tags: ticket?.value?.tags[0] || "",
  },
});

const onSubmit = form.handleSubmit(async (values) => {
  const res = await $fetch(`${apiUrl}/tickets/${route.params.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtCookies.value}`,
    },
    body: JSON.stringify(values),
  });

  navigateTo(`/tickets/${route.params.id}`);
});
</script>
