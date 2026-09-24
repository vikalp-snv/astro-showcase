import { useState } from "react";
import { Checkbox, Stack } from "@vikalpshakya/ui";

// `indeterminate` is a DOM property, not an HTML attribute: server HTML can't
// express it, so this needs hydration. A "select all" is the usual case.
export default function IndeterminateCheckbox() {
  const [items, setItems] = useState({ Latency: true, Throughput: false, Jitter: false });
  const values = Object.values(items);
  const all = values.every(Boolean);
  const some = values.some(Boolean);

  return (
    <Stack gap={1}>
      <Checkbox
        label="All metrics"
        checked={all}
        indeterminate={some && !all}
        onChange={() => setItems({ Latency: !all, Throughput: !all, Jitter: !all })}
      />
      <Stack gap={1} style={{ paddingInlineStart: 24 }}>
        {Object.entries(items).map(([name, checked]) => (
          <Checkbox
            key={name}
            label={name}
            checked={checked}
            onChange={() => setItems((i) => ({ ...i, [name]: !checked }))}
          />
        ))}
      </Stack>
    </Stack>
  );
}
