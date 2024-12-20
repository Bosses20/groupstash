import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">GroupStash</h3>
            <p className="text-secondary-foreground/80">
              Empowering communities through smart group savings.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto">Features</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">Pricing</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">Security</Button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto">About</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">Blog</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">Careers</Button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto">Privacy</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">Terms</Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 text-center text-secondary-foreground/60">
          <p>&copy; {new Date().getFullYear()} GroupStash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};