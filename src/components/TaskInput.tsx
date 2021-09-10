
import { FormControl, FormHelperText, TextField,FormLabel } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { useState } from 'react';
const useStyles = makeStyles(
  createStyles({
    form: {
      width: '100%',
 
    }
  })
)
type Todo = {date:Date , task:string ,status:true | false}
interface TodosProps{
    view?:'mobile'|'desktop'|undefined,
    setOpen?:(value:boolean)=>void,
    todos:Todo[],
    setTodos:(value:Todo[])=>void
}
export const TaskInput:React.FC<TodosProps>=({todos,setTodos,view,setOpen})=>{
    const [todo, setTodo] = useState('');
    const classes = useStyles();
    const addTodo=(e:React.KeyboardEvent)=>{
      if(e.key === 'Enter' && todo.length>0){
          if(view === 'mobile' && setOpen){
              setOpen(false)
          }
          setTodos([...todos,{date:new Date(),task:todo,status:false}])
         setTodo('')
      }
    }
    return (
    <>
   <FormControl className={classes.form}>
          <FormLabel>What would you like to do today?</FormLabel>
          <TextField fullWidth variant='standard' value={todo} onChange={(e) => setTodo(e.target.value)} onKeyDown={(e)=>addTodo(e)}></TextField>
          <FormHelperText>Press Enter to save</FormHelperText>
        </FormControl>
   </>
    );
}
