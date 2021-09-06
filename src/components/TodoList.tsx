import {  Typography, Grid, makeStyles, createStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { CheckBox } from "./CheckBox";


const useStyles=makeStyles(theme=>createStyles({
   todoContainer:{
 
    [theme.breakpoints.down('sm')]:{
        borderTop:'1px solid #000'
    },
    [theme.breakpoints.up('md')]:{
        borderLeft: "1px solid #000" ,
    }
   },
   date:{
    marginTop: "5px" ,
  
   }
}))
type Todo = { date: Date; task: string; status: true | false };
interface TodoListProps {
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
}
type sortedTodos = { [date: string]: Todo[] };
export const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  const [sortedTodos, setSortedTodos] = useState<sortedTodos>({});
  const classes = useStyles();
  const month = ['January','February','March','April','May','June','July','August','September','October','November','December']
  
  const handleStatus = (date: Date, status: true | false) => {
    const newTodos = todos.map((todo) => {
      if (todo.date === date) {
        todo.status = status;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  useEffect(() => {
    const sortedList = todos.reduce((acc, todo, index) => {
      let todoDate =
        todo.date.getDate() +
        " " +
        month[todo.date.getMonth()] +
        " " +
        todo.date.getFullYear();
      //@ts-ignore
      if (acc[todoDate]) {
        //@ts-ignore
        acc[todoDate].push(todo);
      } else {
        //@ts-ignore
        acc[todoDate] = [];
        //@ts-ignore
        acc[todoDate].push(todo);
      }
      return acc;
    }, {});
    setSortedTodos(sortedList);
  }, [todos]);

  return (
    <Grid
      container
      style={{ width: "100%", justifyContent: "center", marginTop: "20px" }}
    >
      {Object.entries(sortedTodos).map((todo) => (
        <>
          <Grid item xs={12} md={3} >
            <Typography className={classes.date}>{todo[0]} </Typography>
          </Grid>
          <Grid item xs={12} md={9} className={classes.todoContainer}>
            {todo[1].map((t,i) => (
              <CheckBox
                handleStatus={(date: Date, status: true | false) =>
                  handleStatus(date, status)
                }
                todo={t}
                key={i}
              />
            ))}
          </Grid>
        </>
      ))}
    </Grid>
  );
};
