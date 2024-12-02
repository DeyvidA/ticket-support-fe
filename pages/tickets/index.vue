<template>
  <div class="container mx-auto p-4">
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-2xl font-bold">Your Tickets</CardTitle>
        <Icon
          class="h-6 w-6 text-muted-foreground"
          name="streamline:ticket-1"
        />
      </CardHeader>
      <CardContent>
        <div
          class="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0"
        >
          <div class="flex-1">
            <div class="relative">
              <Icon
                class="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground"
                name="ri:search-line"
              />
              <Input
                placeholder="Search tickets..."
                v-model="searchTerm"
                class="pl-8"
              />
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <Icon
              class="h-4 w-4 text-muted-foreground"
              name="mingcute:filter-line"
            />
            <Select v-model="statusFilter" defaultValue="all">
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tickets</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card class="flex flex-col" v-for="ticket in data" :key="ticket._id">
            <CardHeader class="flex">
              <CardTitle class="text-lg flex justify-between items-center">
                {{ ticket.title }}

                <NuxtLink
                  :to="`/tickets/${ticket._id}/edit`"
                  class="text-muted-foreground hover:text-primary"
                >
                  <Icon class="h-4 w-4" name="basil:edit-outline" />
                </NuxtLink>
              </CardTitle>
            </CardHeader>
            <CardContent class="flex-grow">
              <div
                class="flex items-center space-x-2 text-sm text-muted-foreground"
              >
                <Icon class="h-4 w-4" name="proicons:calendar" />
                <span>{{
                  new Date(ticket.created_at).toISOString().split("T")[0]
                }}</span>
              </div>
              <div class="mt-2 flex items-center space-x-2">
                <Badge
                  :variant="
                    ticket.status === 'open'
                      ? 'default'
                      : ticket.status === 'Pending'
                      ? 'secondary'
                      : 'destructive'
                  "
                >
                  {{ ticket.status }}
                </Badge>
                <Badge
                  :variant="
                    ticket.priority === 'High'
                      ? 'destructive'
                      : ticket.priority === 'Medium'
                      ? 'default'
                      : 'secondary'
                  "
                >
                  {{ ticket.priority }}
                </Badge>
              </div>
            </CardContent>
            <CardFooter>
              <!-- <Button variant="outline" class="w-full"> View Details </Button> -->
              <NuxtLink
                :to="`/tickets/${ticket._id}`"
                class="hover:text-primary-600 w-full text-xs font-bold text-center text-gray-700"
              >
                View Details
              </NuxtLink>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  layout: "auth",
});

import { ref, watch } from "vue";
import { useDebounce } from "@vueuse/core";

const searchTerm = ref("");
const statusFilter = ref("all");
const filterData = ref([]);

const config = useRuntimeConfig();
const apiUrl = config.public.API_URL;

const debouncedSearchTerm = useDebounce(searchTerm, 500);
const debouncedStatusFilter = useDebounce(statusFilter, 500);

const { data, refresh } = await useFetch(`${apiUrl}/tickets`, {
  params: {
    search: debouncedSearchTerm,
    status: debouncedStatusFilter,
  },
  onRequest({ request, options }) {
    const jwtCookies = useCookie("jwt");
    options.headers.set("Authorization", `Bearer ${jwtCookies.value}`);
  },
});

watch(debouncedSearchTerm, () => {
  refresh();
});
</script>
