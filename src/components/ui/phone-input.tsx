import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const countryCodes = [
  { code: "+256", country: "Uganda" },
  { code: "+254", country: "Kenya" },
  { code: "+255", country: "Tanzania" },
  { code: "+250", country: "Rwanda" },
  { code: "+257", country: "Burundi" },
];

export function PhoneInput({ value, onChange, error }: PhoneInputProps) {
  const [countryCode, phoneNumber] = value.split(" ") || ["+256", ""];

  const handleCountryCodeChange = (newCode: string) => {
    onChange(`${newCode} ${phoneNumber}`);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value.replace(/[^0-9]/g, "");
    onChange(`${countryCode} ${newNumber}`);
  };

  return (
    <div className="flex gap-2">
      <Select value={countryCode} onValueChange={handleCountryCodeChange}>
        <SelectTrigger className="w-[110px]">
          <SelectValue placeholder="+256" />
        </SelectTrigger>
        <SelectContent>
          {countryCodes.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              {country.code} {country.country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        className="flex-1"
        placeholder="700000000"
      />
    </div>
  );
}
