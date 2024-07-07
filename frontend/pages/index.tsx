import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import api from "@/libs/api";
import { TextField, Button, Grid, Typography, Box, IconButton, Checkbox, Alert, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import useAuth from "@/libs/useAuth";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddButton from "@/components/AddButton";

export default function Home() {
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<number | null>(null);
  const [importance, setImportance] = useState<number | null>(null);
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [todoCounts, setTodoCounts] = useState<number[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();


  const fetchTodos = async () => {
    try {
      const response = await api.get('/todos');
      setTodos(response.data);
      // todoCountsに各エリアのタスクの個数をセット

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      fetchTodos();
    }
  },);

  const handleIPClick = (index: number, importance: number, priority: number) => {
    setSelectedButton(null);
    setSelectedButton(index);
    setImportance(importance);
    setPriority(priority);
  };

  // 登録時の個数制限判断用の関数
  const validateTaskCount = (priority: number, importance: number) => {
    const count = todos.filter((todo: any) => todo.priority === priority && todo.importance === importance).length;
    return count < 7;  // countが7未満であればtrueを返し、そうでなければfalseを返す
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (content === '') {
      setIsError(true);
      setErrorMessage('タスクを入力してください。');
      return;
    }
    if (content.length > 20) {
      setIsError(true);
      setErrorMessage('タスクは最大20文字までです。');
      return;
    }
    if (importance === null || priority === null) {
      setIsError(true);
      setErrorMessage('「重要度」と「緊急度」を選択してください。');
      return;
    }
    if (!validateTaskCount(priority, importance)) {
      setIsError(true);
      setErrorMessage('登録できるタスクは各エリア7つまでです。');
      return;
    }

    try {
      await api.post('/todos', { content, priority, importance });
      setSelectedButton(null);
      setContent('');
      setImportance(null);
      setPriority(null);
      setOpen(false);
      setIsError(false);
      setErrorMessage('');
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/todos/${id}`)
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const renderTodos = (priority: number, importance: number) => {
    return todos
      .filter((todo: any) => todo.priority === priority && todo.importance === importance)
      .map((todo: any) => (
        <Box key={todo.id} display="flex" justifyContent="space-between" alignItems="center" >
          <Checkbox />
          <Typography>{todo.content}</Typography>
          <IconButton onClick={() => handleDelete(todo.id)}><DeleteIcon /></IconButton>
        </Box>
      ));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedButton(null);
    setContent('');
    setImportance(null);
    setPriority(null);
    setIsError(false);
    setErrorMessage('');
  };

  if (loading || isAuthenticated === undefined) {
    return (
      <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        height: '100vh' // 画面全体の高さを指定して中央に配置
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isAuthenticated === false) {
    return null;  // リダイレクト処理が完了するまで何もしない
  }

  return (
    <div>
      <AddButton color="secondary" aria-label="add"
        onClick={(e) => {
          handleOpen()
        }}>
        <AddIcon />
      </AddButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>タスクの追加</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField label='Todo' value={content} onChange={(e) => setContent(e.target.value)}
              fullWidth margin="normal" />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', }}>
              <Box sx={{ flex: '1 1 50%', p: 1 }}><Button variant={selectedButton === 1 ? 'contained' : 'outlined'} fullWidth
                onClick={() => { handleIPClick(1, 0, 1) }}>重要×緊急でない</Button></Box>
              <Box sx={{ flex: '1 1 50%', p: 1 }}><Button variant={selectedButton === 2 ? 'contained' : 'outlined'} fullWidth
                onClick={() => { handleIPClick(2, 1, 1) }} >重要×緊急</Button></Box>
              <Box sx={{ flex: '1 1 50%', p: 1 }}><Button variant={selectedButton === 3 ? 'contained' : 'outlined'} fullWidth
                onClick={() => { handleIPClick(3, 0, 0) }}>重要でない×緊急でない</Button></Box>
              <Box sx={{ flex: '1 1 50%', p: 1 }}><Button variant={selectedButton === 4 ? 'contained' : 'outlined'} fullWidth
                onClick={() => { handleIPClick(4, 1, 0) }}>重要でない×緊急</Button></Box>
            </Box>
            <DialogActions>
              <Button onClick={handleClose}>キャンセル</Button>
              <Button type="submit" variant="contained" color="primary">追加</Button>
            </DialogActions>
          </form>
          {isError ? (
            <Box sx={{ mx: 'auto', mt: 2 }}>
              <Alert onClose={() => { setIsError(false); setErrorMessage(""); }} severity="error">
                {errorMessage}
              </Alert>
            </Box>
          ) : null}
        </DialogContent>
      </Dialog>

      <Box sx={{ width: '100%', bgcolor: '#90caf9 ', textAlign: '', p: 1, color: '#fff' }}>
        <Typography variant="h6" sx={{ marginLeft: 'calc(50% - 43px)' }}><strong>重要</strong></Typography>
      </Box>
      <Box sx={{ display: 'flex', height: 'calc(100vh - 120px)' }}>  {/* Height adjusted to account for header and label */}
        <Grid container spacing={0} sx={{ flexGrow: 1 }}>
          <Grid item xs={6} container direction="column" alignItems="flex-start" justifyContent="flex-start" sx={{ height: 'calc(50% - 1px)', backgroundColor: '#e3f2fd', overflowY: 'auto', border: '2px solid white', p: 1 }}>
            {renderTodos(1, 0)}
          </Grid>
          <Grid item xs={6} container direction="column" alignItems="flex-start" justifyContent="flex-start" sx={{ height: 'calc(50% - 1px)', backgroundColor: '#e3f2fd', overflowY: 'auto', border: '2px solid white', p: 1 }}>
            {renderTodos(1, 1)}
          </Grid>
          <Grid item xs={6} container direction="column" alignItems="flex-start" justifyContent="flex-start" sx={{ height: 'calc(50% - 1px)', backgroundColor: '#e3f2fd', overflowY: 'auto', border: '2px solid white', p: 1 }}>
            {renderTodos(0, 0)}
          </Grid>
          <Grid item xs={6} container direction="column" alignItems="flex-start" justifyContent="flex-start" sx={{ height: 'calc(50% - 1px) ', backgroundColor: '#e3f2fd', overflowY: 'auto', border: '2px solid white', p: 1 }}>
            {renderTodos(0, 1)}
          </Grid>
        </Grid>
        <Box sx={{ width: '48px', bgcolor: '#90caf9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <Typography variant="h6" sx={{ writingMode: 'vertical-rl' }}><strong>緊急</strong></Typography>
        </Box>
      </Box>
    </div>
  );
}
