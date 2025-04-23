import { useEffect, useState } from "react";
import axios from "axios"; 
import { Select, SelectTrigger, SelectContent, SelectItem } from "./ui/select";

type Option = {
  id: string;
  label: string;
};

export default function APIcomponent() {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        
        const data = response.data.map((item: { id: number; title: string }) => ({
          id: item.id.toString(),
          label: item.title,
        }));

        setOptions(data); 
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  return (
    <div>
      <Select >
        {/* Trigger to open the Select dropdown */}
        <SelectTrigger>
          Select a Task
        </SelectTrigger>
        <SelectContent>
          {/* Map through the options to display them in the dropdown */}
          {options.map((option) => (
            <SelectItem  key={option.id} value={option.id}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
