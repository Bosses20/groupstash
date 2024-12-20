import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-gradient-primary py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d')] bg-cover bg-center opacity-5" />
      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/20">
            <h3 className="font-bold text-lg mb-4 text-white">GroupStash</h3>
            <p className="text-white/80">
              Empowering communities through smart group savings.
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/20">
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Features</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Pricing</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Security</Button>
              </li>
            </ul>
          </div>
          <div className="backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/20">
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">About</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Blog</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Careers</Button>
              </li>
            </ul>
          </div>
          <div className="backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/20">
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Privacy</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Terms</Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} GroupStash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};