<template>
  <div class="flex h-screen overflow-hidden">
    <aside class="hidden w-64 overflow-y-auto border-r bg-gray-100/40 lg:block">
      <div class="flex h-full flex-col">
        <div class="flex h-14 items-center border-b px-4">
          <NuxtLink class="flex items-center gap-2 font-semibold" href="/">
            <Icon class="h-6 w-6" name="streamline:ticket-1" />
            <span>TicketPro</span>
          </NuxtLink>
        </div>
        <ScrollArea class="flex-1 py-2">
          <nav class="grid gap-1 px-2">
            <NuxtLink
              v-for="item in sidebarItems"
              :key="item.href"
              :to="item.href"
              :class="[
                'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900',
                $route.path === item.href
                  ? 'bg-gray-200 text-gray-900'
                  : 'hover:bg-gray-200',
              ]"
            >
              <Icon class="h-4 w-4" :name="item.icon" />
              {{ item.label }}
            </NuxtLink>
          </nav>
        </ScrollArea>
        <div class="p-4">
          <Button as-child class="w-full justify-start" variant="default">
            <NuxtLink href="/tickets/new" class="flex items-center">
              <Icon class="mr-2 h-6 w-6" name="ei:plus" />
              Create Ticket
            </NuxtLink>
          </Button>
        </div>
        <div class="mt-auto p-4">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" class="w-full justify-start gap-2">
                <User class="h-4 w-4" />
                <span>{{ userCookie.username }}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                @click="logout"
                class="flex items-center gap-2 bg-gray-800 text-white hover:text-white"
              >
                <Button variant="ghost" class="w-full justify-start gap-2">
                  <Icon class="h-4 w-4" name="majesticons:logout-line" />
                  <span>Log out</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
    <div class="flex flex-1 flex-col overflow-hidden">
      <header
        class="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 lg:hidden"
      >
        <Sheet>
          <SheetTrigger as-child>
            <Button variant="outline" size="icon" class="lg:hidden">
              <Icon class="h-6 w-6" name="majesticons:menu-line" />
              <span class="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="w-[300px] sm:w-[400px]">
            <nav class="grid gap-2 py-6">
              <NuxtLink
                v-for="item in sidebarItems"
                :key="item.href"
                :to="item.href"
                :class="[
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900',
                  $route.path === item.href
                    ? 'bg-gray-200 text-gray-900'
                    : 'hover:bg-gray-200',
                ]"
              >
                <Icon class="h-4 w-4" :name="item.icon" />

                {{ item.label }}
              </NuxtLink>
            </nav>
          </SheetContent>
        </Sheet>
        <div class="flex-1">
          <NuxtLink class="flex items-center gap-2 font-semibold" href="/">
            <Icon class="h-6 w-6" name="streamline:ticket-1" />
            <span>TicketPro</span>
          </NuxtLink>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="w-full justify-start gap-2">
              <User class="h-4 w-4" />
              <span>{{ userCookie.username }}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem> Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icon class="mr-2 h-4 w-4" name="majesticons:logout-line" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main class="flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const sidebarItems = [
  { href: "/tickets", label: "Tickets", icon: "streamline:ticket-1" },
  { href: "/settings", label: "Settings", icon: "oui:gear" },
];

const userCookie = useCookie("user");

const logout = () => {
  userCookie.value = null;
  navigateTo("/login");
};
</script>
