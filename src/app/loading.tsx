import { StatePanel } from "@/components/locator/StatePanel";

export default function Loading() {
  return (
    <main className="min-h-screen bg-pearl p-6">
      <div className="mx-auto max-w-xl pt-20">
        <StatePanel title="Loading store locator" message="Preparing the map-first discovery experience." />
      </div>
    </main>
  );
}
