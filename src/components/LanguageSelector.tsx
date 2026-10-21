import { Languages } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/components/LanguageProvider";
import { isLanguage, LANGUAGES } from "@/lib/translations";

export function LanguageSelector() {
  const { language, direction, setLanguage, t } = useLanguage();
  return (
    <Select value={language} dir={direction} onValueChange={(value) => { if (isLanguage(value)) setLanguage(value); }}>
      <SelectTrigger aria-label={t("Idioma")} className="w-[126px] shrink-0 gap-2">
        <Languages className="size-4 shrink-0 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map(({ value, label }) => <SelectItem key={value} value={value}><span lang={value} dir={value === "ar" ? "rtl" : "ltr"}>{label}</span></SelectItem>)}
      </SelectContent>
    </Select>
  );
}