<template>
   <div class="container mx-auto p-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-2xl font-bold">Your Tickets</CardTitle>
          <TicketIcon class="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div class="flex-1">
              <div class="relative">
                <Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  v-model={searchTerm}
                  class="pl-8"
                />
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <Filter class="h-4 w-4 text-muted-foreground" />
              <Select onValueChange={setStatusFilter} defaultValue="All">
                <SelectTrigger class="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Tickets</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTickets.map((ticket) => (
              <Card key={ticket.id} class="flex flex-col">
                <CardHeader>
                  <CardTitle class="text-lg">{ticket.title}</CardTitle>
                </CardHeader>
                <CardContent class="flex-grow">
                  <div class="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar class="h-4 w-4" />
                    <span>{ticket.date}</span>
                  </div>
                  <div class="mt-2 flex items-center space-x-2">
                    <Badge variant={
                      ticket.status === 'Open' ? 'default' :
                      ticket.status === 'Pending' ? 'secondary' : 'outline'
                    }>
                      {ticket.status}
                    </Badge>
                    <Badge variant={
                      ticket.priority === 'High' ? 'destructive' :
                      ticket.priority === 'Medium' ? 'default' : 'secondary'
                    }>
                      {ticket.priority}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" class="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {filteredTickets.length === 0 && (
            <div class="text-center py-4 text-muted-foreground">
              <!-- <AlertCircle class="mx-auto h-8 w-8 mb-2" /> -->
              <p>No tickets found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
</template>
