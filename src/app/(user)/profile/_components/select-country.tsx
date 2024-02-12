import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo, Democratic Republic of the",
  "Congo, Republic of the",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor (Timor-Leste)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini (Swaziland)",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia (formerly Macedonia)",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Abkhazia",
  "Kosovo",
  "Nagorno-Karabakh",
  "Northern Cyprus",
  "Sahrawi Arab Democratic Republic",
  "Somaliland",
  "South Ossetia",
  "Taiwan (Republic of China)",
  "Transnistria",
  "Åland Islands",
  "Guernsey",
  "Isle of Man",
  "Jersey",
  "Anguilla",
  "Bermuda",
  "British Indian Ocean Territory",
  "British Virgin Islands",
  "Cayman Islands",
  "Falkland Islands",
  "Gibraltar",
  "Montserrat",
  "Pitcairn Islands",
  "Saint Helena, Ascension and Tristan da Cunha",
  "South Georgia and the South Sandwich Islands",
  "Turks and Caicos Islands",
  "Northern Mariana Islands",
  "Puerto Rico",
  "United States Virgin Islands",
  "American Samoa",
  "Cook Islands",
  "French Polynesia",
  "Guam",
  "Marshall Islands",
  "New Caledonia",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Palau",
  "Pitcairn Islands",
  "Samoa",
  "Tokelau",
  "Tonga",
  "Tuvalu",
  "Wallis and Futuna",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Hong Kong",
  "Macau",
  "Faroe Islands",
  "Greenland",
  "French Guiana",
  "Guadeloupe",
  "Martinique",
  "Mayotte",
  "Réunion",
  "Saint Barthélemy",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Svalbard and Jan Mayen",
  "Azores",
  "Madeira",
  "Canary Islands",
  "Channel Islands",
  "Faroe Islands",
  "Gibraltar",
  "Isle of Man",
  "Sark",
  "Akrotiri and Dhekelia",
  "Ceuta",
  "Melilla",
  "Plazas de soberanía",
  "Açores (Azores)",
  "Madeira",
  "Balearic Islands",
  "Canary Islands",
  "Guadeloupe",
  "French Guiana",
  "Martinique",
  "Réunion",
  "Saint Pierre and Miquelon",
  "Mayotte",
  "Sint Maarten",
  "Aruba",
  "Curaçao",
  "Bonaire",
  "Saba",
  "Sint Eustatius",
  "Curonian Spit (shared with Lithuania)",
  "High Tatras (shared with Slovakia)",
  "Mont Blanc (shared with France)",
  "Mount Elbrus (shared with Russia)",
  "Picos de Europa",
  "Pyrenees",
  "Swiss Alps",
  "Carpathian Mountains",
  "Dinaric Alps",
  "Julian Alps",
  "Apennine Mountains",
  "Balkan Mountains",
  "Pennine Alps",
  "Transylvanian Alps",
  "Ural Mountains",
  "Scandinavian Mountains",
];

export default function SelectCountry({ form }: { form: any }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between  rounded-sm py-5"
        >
          {value ? value : "Select country..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup className=" overflow-y-auto">
            <div className="max-h-[300px]">
              {countries.map((country, i) => (
                <CommandItem
                  key={i}
                  value={country}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    form.setValue("country", value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === country ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {country}
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
