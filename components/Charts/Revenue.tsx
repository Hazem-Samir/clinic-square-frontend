import {  Card,
      CardContent,
      CardDescription,
      CardHeader,
      CardTitle, } from "@/components/ui/card"
import {DollarSign,} from "lucide-react"
import NumberTicker from "../ui/number-ticker"
const Revenue =()=>{
      return(
  <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">      <NumberTicker value={100} />$</div>
              <p className="text-xs text-muted-foreground">
               This Month
              </p>
            </CardContent>
          </Card>
      )
}

export default Revenue