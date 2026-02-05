import { sansthanHistory } from "@/data/sansthan-data";

export default function AboutPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold font-heading text-brand-maroon mb-6 text-center">About Sansthan</h1>
      
      <div className="prose prose-lg mx-auto text-muted-foreground">
        <p className="lead text-xl text-center mb-8 font-medium text-foreground">
          &quot;{sansthanHistory.motto}&quot;
        </p>
        
        <div className="bg-muted/30 p-8 rounded-xl border mb-8">
          <h2 className="text-2xl font-bold font-heading text-brand-maroon mb-4">Our History</h2>
          <p>
            {sansthanHistory.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
             <h3 className="text-xl font-bold font-heading text-brand-maroon mb-2">Mission</h3>
             <p>
               To provide spiritual solace and service to humanity through the teachings of Shri Gajanan Maharaj.
               We strive to maintain the highest standards of cleanliness, discipline, and devotion.
             </p>
          </div>
          <div>
             <h3 className="text-xl font-bold font-heading text-brand-maroon mb-2">Values</h3>
             <ul className="list-disc pl-5 space-y-1">
               <li>Seva (Service)</li>
               <li>Discipline</li>
               <li>Cleanliness</li>
               <li>Equality</li>
               <li>Devotion</li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
