import { motion } from "framer-motion";
import { 
  Target, 
  TrendingUp, 
  BrainCircuit, 
  Award,
  ChevronRight,
  Zap
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

const SKILL_DATA = [
  { subject: 'React', A: 120, fullMark: 150 },
  { subject: 'Node.js', A: 98, fullMark: 150 },
  { subject: 'System Design', A: 86, fullMark: 150 },
  { subject: 'Python', A: 99, fullMark: 150 },
  { subject: 'DevOps', A: 85, fullMark: 150 },
  { subject: 'UI/UX', A: 65, fullMark: 150 },
];

const MARKET_DEMAND = [
  { name: 'Jan', demand: 400 },
  { name: 'Feb', demand: 300 },
  { name: 'Mar', demand: 550 },
  { name: 'Apr', demand: 450 },
  { name: 'May', demand: 700 },
];

export default function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2">Welcome back, <span className="text-gradient">Alex</span></h1>
          <p className="text-muted-foreground text-lg">Here's your career trajectory and latest AI insights.</p>
        </motion.div>
        
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-primary/20 text-primary border border-primary/30 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-primary/30 transition-colors"
        >
          <Zap className="w-4 h-4" />
          Generate New Path
        </motion.button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Current Role Match", value: "85%", icon: Target, color: "text-primary" },
          { title: "Skill Gap", value: "3 Areas", icon: BrainCircuit, color: "text-secondary" },
          { title: "Market Growth", value: "+24%", icon: TrendingUp, color: "text-green-400" },
          { title: "Certifications", value: "2 Near", icon: Award, color: "text-amber-400" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="glass-panel p-6 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
            </div>
            <p className="text-3xl font-bold font-mono">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-2 glass-panel p-6 rounded-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Skill Profile Analysis</h2>
            <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/20">AI Generated</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SKILL_DATA}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                <Radar name="Current Skills" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel p-6 rounded-2xl flex flex-col"
        >
          <h2 className="text-xl font-semibold mb-6">AI Recommendations</h2>
          <div className="space-y-4 flex-1">
            {[
              { title: "Advanced System Design", type: "Course", urgency: "High" },
              { title: "UI/UX Fundamentals", type: "Project", urgency: "Medium" },
              { title: "Mock Interview: Sr. Frontend", type: "Practice", urgency: "High" }
            ].map((rec, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-muted-foreground">{rec.type}</span>
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm ${rec.urgency === 'High' ? 'bg-destructive/20 text-destructive-foreground' : 'bg-secondary/20 text-secondary'}`}>
                    {rec.urgency}
                  </span>
                </div>
                <h4 className="font-medium text-sm group-hover:text-primary transition-colors">{rec.title}</h4>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 flex items-center justify-center gap-2 text-sm text-primary hover:text-primary-foreground transition-colors py-2">
            View All Action Items <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}