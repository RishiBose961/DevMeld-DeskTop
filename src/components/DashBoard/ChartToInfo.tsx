import { Cell, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  count: { label: "Total Count" },
  submissionCount: { label: "Submission Count" },
} satisfies ChartConfig

export function ChartToInfo({ getCount }: { getCount: { count: number; submissionCount: number } | null }) {
  if (!getCount) return null

  // ✅ Convert object to array format for Recharts
  const chartData = [
    { name: "Total Problems", value: getCount.count, },
    { name: "Submission", value: getCount.submissionCount },
  ]

  const COLORS = ["var(--chart-1)", "var(--chart-2)"]

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Submission Overview</CardTitle>
        <CardDescription>Data Summary</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={100}
              paddingAngle={4}
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
    
        <div className="text-muted-foreground leading-none">
          Showing total submission data
        </div>
      </CardFooter>
    </Card>
  )
}
