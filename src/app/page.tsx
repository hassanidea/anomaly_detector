import Link from "next/link";
import Form from "./_components/Form";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b py-10 text-white">
      <p className="text-3xl text-black">Anomaly Detector</p>
      {/* Input form */}
      <div className="py-10">
        <Form />
      </div>
    </main>
  );
}
