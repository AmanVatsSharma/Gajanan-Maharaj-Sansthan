import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Utensils, Flower2, Bus } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function Features() {
  const features = [
    {
      title: "Bhakta Niwas",
      description: "Clean and affordable accommodation for families visiting the holy shrine.",
      icon: Building2,
    },
    {
      title: "Mahaprasad",
      description: "Hygienic and nutritious prasad distribution for thousands of devotees daily.",
      icon: Utensils,
    },
    {
      title: "Anand Sagar",
      description: "Spiritual and recreational park with meditation centers and beautiful gardens.",
      icon: Flower2,
    },
    {
      title: "Free Bus Service",
      description: "Complimentary transport between Railway Station, Bhakta Niwas, and Temple.",
      icon: Bus,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-maroon mb-4">
              Sansthan Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dedicated to the service of humanity and devotees with discipline and devotion.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow h-full bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto bg-brand-saffron/10 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center group hover:bg-brand-saffron/20 transition-colors">
                    <feature.icon className="h-8 w-8 text-brand-saffron" />
                  </div>
                  <CardTitle className="text-xl font-bold text-brand-maroon">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  {feature.description}
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
