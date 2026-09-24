import { Badge, Table, Tabs, TabsContent, TabsList, TabsTrigger, Text } from "@vikalpshakya/ui";

// TabsTrigger/TabsContent read Tabs' context, so the set is one island.
// Uncontrolled (defaultValue): no demo state needed.
export default function TabsDemo() {
  return (
    <Tabs defaultValue="overview">
      <TabsList aria-label="Test run">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="kpis">KPIs</TabsTrigger>
        <TabsTrigger value="logs">Logs</TabsTrigger>
        <TabsTrigger value="export" disabled>Export (disabled)</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Text>
          Run #4812 completed on 64 UEs. <Badge variant="success">Passed</Badge>
        </Text>
      </TabsContent>
      <TabsContent value="kpis">
        <Table density="compact">
          <caption>Key metrics</caption>
          <thead>
            <tr><th scope="col">Metric</th><th scope="col">Value</th></tr>
          </thead>
          <tbody>
            <tr><td>DL throughput</td><td>1.42 Gbps</td></tr>
            <tr><td>Latency (p95)</td><td>8.1 ms</td></tr>
          </tbody>
        </Table>
      </TabsContent>
      <TabsContent value="logs">
        <Text mono size="sm">[12:04:11] RRC setup complete (UE 17)</Text>
      </TabsContent>
      <TabsContent value="export">Not available.</TabsContent>
    </Tabs>
  );
}
