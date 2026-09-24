import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Flex, Text } from "@vikalpshakya/ui";

// Trigger, menu and items share context, so they must be one React tree (one island).
export default function DropdownDemo() {
  const [last, setLast] = useState("");
  const [columns, setColumns] = useState({ latency: true, throughput: true, jitter: false });

  return (
    <Flex direction="column" gap={3}>
      <Flex wrap gap={2}>
        <Dropdown>
          <DropdownTrigger>Actions ▾</DropdownTrigger>
          <DropdownMenu>
            <DropdownItem onClick={() => setLast("Edit")}>Edit</DropdownItem>
            <DropdownItem onClick={() => setLast("Duplicate")}>Duplicate</DropdownItem>
            <DropdownItem onClick={() => setLast("Export")}>Export CSV</DropdownItem>
            <DropdownItem disabled>Archive (disabled)</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <DropdownTrigger variant="secondary">Columns ▾</DropdownTrigger>
          <DropdownMenu>
            {(Object.keys(columns) as (keyof typeof columns)[]).map((key) => (
              <DropdownItem
                key={key}
                checked={columns[key]}
                onClick={(event) => {
                  event.preventDefault(); // keep the menu open while toggling
                  setColumns((c) => ({ ...c, [key]: !c[key] }));
                }}
              >
                {key[0].toUpperCase() + key.slice(1)}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <DropdownTrigger variant="ghost" size="sm">Aligned to end ▾</DropdownTrigger>
          <DropdownMenu align="end">
            <DropdownItem onClick={() => setLast("Profile")}>Profile</DropdownItem>
            <DropdownItem onClick={() => setLast("Sign out")}>Sign out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Flex>
      <Text size="sm" tone="muted" role="status">
        Last action: {last || "none"} · Columns:{" "}
        {Object.entries(columns).filter(([, on]) => on).map(([k]) => k).join(", ") || "none"}
      </Text>
    </Flex>
  );
}
