<template>
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
          Enter your credentials to access your support dashboard
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem class="space-y-2">
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormControl>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
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
        <NuxtLink
          to="/forgot-password"
          class="text-sm text-blue-500 hover:underline block"
        >
          Forgot your password?
        </NuxtLink>
      </CardContent>
      <CardFooter class="flex flex-col space-y-4">
        <Button class="w-full" type="submit">Log In</Button>
        <div class="text-sm text-center text-gray-500">
          Don't have an account?
          <NuxtLink to="/register" class="text-blue-500 hover:underline">
            Sign up
          </NuxtLink>
        </div>
      </CardFooter>
    </form>
  </Card>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

useSeoMeta({
  title: "Login - TicketPro Support",
  description:
    "Log in to access your TicketPro support dashboard and manage your tickets effectively.",
  ogTitle: "Login - TicketPro Support",
  ogDescription:
    "Log in to access your TicketPro support dashboard and manage your tickets effectively.",
  ogImage: "https://example.com/login-image.png",
  keywords: "login, TicketPro, support dashboard, account access",
});

useHead({
  meta: [{ name: "robots", content: "index,follow" }],
});

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  const config = useRuntimeConfig();

  const jwtCookies = useCookie("jwt");
  const userCookies = useCookie("user");

  const res = await $fetch(`${config.public.API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  jwtCookies.value = res.access_token;
  userCookies.value = res.user;

  navigateTo("/dashboard");
});
</script>
