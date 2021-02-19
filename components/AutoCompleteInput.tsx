import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const roles = [
  { title: "Interior Designer", id: 0 },
  { title: "InterFace Designer", id: 1 },
  { title: "Industrial Designer", id: 2 },
  { title: "User Experience Designer", id: 3 },
];

export default function AutoCompleteInput({ selectedItems, onChange }) {
  return (
    <Autocomplete
      multiple
      className="form__autoComplete"
      options={roles.map((option) => option.title)}
      defaultValue={selectedItems}
      onChange={onChange}
      freeSolo
      renderTags={(value: string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} variant="filled" placeholder="+ add roles" />
      )}
    />
  );
}
