import { Box, Checkbox, FormLabel } from "@material-ui/core";

interface CheckBoxProps {
  todo: { date: Date; task: string; status: true | false };

  handleStatus: (date: Date, status: true | false) => void;
}
export const CheckBox: React.FC<CheckBoxProps> = ({ todo, handleStatus }) => {

  return (
    <>
      <Box style={{display:'flex'}}>
        <Box>
        <Checkbox
          id="check"
          checked={todo.status}
          onChange={() => handleStatus(todo.date, !todo.status)}
          inputProps={{ "aria-label": "primary checkbox" }}
          color='primary'
        />
        </Box>
     
        <Box style={{width:'90%',backgroundColor:'#fff',minHeight:'50px',marginTop:'10px',padding:'10px'}}>
        <FormLabel
          htmlFor="check"
          style={
            todo.status
              ? { textDecoration: "line-through"  }
              : { textDecoration:"none"}
          }
        >
          {todo.task}
        </FormLabel>
        </Box>
      </Box>
    </>
  );
};
