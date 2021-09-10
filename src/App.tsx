import {  Drawer, Hidden, Box } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { TaskInput } from "./components/TaskInput";
import { TodoList } from "./components/TodoList";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
     position:'absolute',
     left:0,
     right:0,
     top:0,
     bottom:0,
      display: "flex",
      backgroundColor: "#84DCCF" 
    },
    secondaryContainer: {
      backgroundColor: "#b2dfdb",
    },
    wrapper: {
      width: "40%",
      margin: "auto",

      [theme.breakpoints.down("md")]: {
        width: "90%",
        pading: "5px",
      },
    },
    secondaryWrapper: {
      marginTop:'0',
      paddingTop: "70px",
      
    },
  })
);
type Todo = { date: Date; task: string; status: true | false };
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();

  return (
    <Box
      className={
        todos.length > 0
          ? classes.container
          : `${classes.container} ${classes.secondaryContainer}`
      }
    >
      <Box
        className={
          todos.length > 0
            ? ` ${classes.wrapper} ${classes.secondaryWrapper} `
            : classes.wrapper
        }
      >
        <Hidden mdDown>
          <TaskInput todos={todos} setTodos={setTodos} />  
        </Hidden>

        <TodoList todos={todos} setTodos={setTodos} />
        <Hidden mdUp>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => setOpen(true)}
            style={{ position: "fixed", bottom: 10, right: 20 }}
          >
            <AddIcon />
          </Fab>
          <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
            <Box style={{ padding: "20px" }}>
              <TaskInput
                todos={todos}
                setTodos={setTodos}
                setOpen={setOpen}
                view="mobile"
              />
            </Box>
          </Drawer>
        </Hidden>
      </Box>
    </Box>
  );
}

export default App;
