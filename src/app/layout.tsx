import "@/styles/globals.css";
import { TaskProvider } from "@/contexts/TaskContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TaskProvider>{children}</TaskProvider>
      </body>
    </html>
  );
}
