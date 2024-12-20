import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-gradient-primary py-16 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/20">
            <h3 className="font-bold text-lg mb-4 text-gray-900">GroupStash</h3>
            <p className="text-gray-800">
              Empowering communities through smart group savings.
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/20">
            <h4 className="font-semibold mb-4 text-gray-900">Product</h4>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-800 hover:text-primary">Features</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-800 hover:text-primary">Pricing</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-800 hover:text-primary">Security</Button>
              </li>
            </ul>
          </div>
          <div className="backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/20">
            <h4 className="font-semibold mb-4 text-gray-900">Company</h4>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-800 hover:text-primary">About</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-800 hover:text-primary">Blog</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-800 hover:text-primary">Careers</Button>
              </li>
            </ul>
          </div>
          <div className="backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/20">
            <h4 className="font-semibold mb-4 text-gray-900">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-800 hover:text-primary">Privacy</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-800 hover:text-primary">Terms</Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800/20 pt-8 text-center text-gray-800">
          <p>&copy; {new Date().getFullYear()} GroupStash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};