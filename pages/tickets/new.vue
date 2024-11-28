<template>
  <div class="container mx-auto p-4">
    <Card>
      <CardHeader>
        <CardTitle class="text-2xl font-bold flex items-center gap-2">
          <Icon class="h-6 w-6" name="streamline:ticket-1" />

          Create New Ticket
        </CardTitle>
      </CardHeader>
      <form @submit="onSubmit">
        <CardContent class="space-y-4">
          <FormField v-slot="{ componentField }" name="title">
            <FormItem class="space-y-2">
              <FormLabel htmlFor="title">Title</FormLabel>
              <FormControl>
                <Input
                  id="title"
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
          <Button type="submit" class="w-full">Create Ticket</Button>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const schema = toTypedSchema(
  z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().nonempty("Description is required"),
    tags: z.string().nonempty("Tags is required"),
  })
);

const form = useForm({
  validationSchema: schema,
});

const onSubmit = form.handleSubmit(async (values) => {
  console.log(values);

  const config = useRuntimeConfig();
  const apiUrl = config.public.API_URL;
  const jwtCookies = useCookie("jwt");
  const userCookies = useCookie("user");

  values.userId = userCookies.value;
  const res = await $fetch(`${apiUrl}/tickets/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtCookies.value}`,
    },
    body: JSON.stringify(values),
  });

  navigateTo(`/tickets`);
});
</script>
