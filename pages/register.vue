<template>
  <Head> </Head>

  <Card class="w-full max-w-md">
    <form @submit="onSubmit">
      <CardHeader class="space-y-1">
        <div class="flex items-center justify-center mb-4">
          <Icon
            class="h-10 w-10 text-blue-500 mr-2"
            name="streamline:ticket-1"
          />
          <CardTitle class="text-2xl font-bold">TicketPro Support</CardTitle>
        </div>
        <CardDescription>
          Create an account to access our support system
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem class="space-y-2">
            <FormLabel htmlFor="username">Username</FormLabel>
            <FormControl>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                required
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem class="space-y-2">
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormControl>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem class="space-y-2">
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormControl>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                required
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="confirmPassword">
          <FormItem class="space-y-2">
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <FormControl>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </CardContent>
      <CardFooter class="flex flex-col space-y-4">
        <Button class="w-full" type="submit">
          <Icon class="mr-2 h-4 w-4" name="lucide:user-plus" /> Register
        </Button>
        <div class="text-sm text-center text-gray-500">
          Already have an account?
          <NuxtLink to="/login" class="text-blue-500 hover:underline">
            Log in
          </NuxtLink>
        </div>
      </CardFooter>
    </form>
  </Card>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

useSeoMeta({
  title: "Register - TicketPro Support",
  description:
    "Create an account to access TicketPro's support system and manage your tickets efficiently.",
  ogTitle: "Register - TicketPro Support",
  ogDescription:
    "Create an account to access TicketPro's support system and manage your tickets efficiently.",
  // ogImage: "https://example.com/register-image.png",
  keywords: "register, TicketPro, support system, account creation",
});

useHead({
  meta: [{ name: "robots", content: "index,follow" }],
});

const formSchema = toTypedSchema(
  z
    .object({
      username: z.string().min(2).max(50),
      email: z.string().email(),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  console.log("Form submitted!", values);

  const config = useRuntimeConfig();

  const apiUrl = config.public.API_URL;

  await $fetch(`${apiUrl}/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  navigateTo("/login");
});
</script>
