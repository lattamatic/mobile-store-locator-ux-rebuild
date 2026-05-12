"use client";

import { Button } from "@/components/ui/Button";
import { StatePanel } from "@/components/locator/StatePanel";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen bg-pearl p-6">
      <div className="mx-auto max-w-xl pt-20">
        <StatePanel title="Something went wrong" message="The locator keeps the recovery action visible so mobile users can continue quickly." />
        <div className="mt-4 flex justify-center">
          <Button type="button" onClick={reset}>
            Retry
          </Button>
        </div>
      </div>
    </main>
  );
}
