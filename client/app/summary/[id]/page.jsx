import SummaryPage from "@/components/SummaryPage";

export default async function Page() {
  const tempData = {
    title: "1712 Module 1",
    description: "I am not sure I can help you create notes for this class. It's too hard.",
    date: new Date(),
    tag: "COMP 1712"
  }
  return <SummaryPage params={{note: tempData}} />;
}