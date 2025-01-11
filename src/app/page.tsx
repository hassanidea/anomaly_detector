import Link from "next/link";
import Form from "./_components/Form";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b py-10 text-white">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight text-black first:mt-0">
        Anomaly Detector
      </h2>
      {/* Input form */}
      <div className="py-10">
        <Form />
      </div>
    </main>
  );
}
