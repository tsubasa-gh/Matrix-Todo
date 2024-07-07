// components/AddButton/index.tsx
import { styled } from '@mui/material';
import Fab from '@mui/material/Fab';

// 画面中央のボタン
const AddButton = styled(Fab)(({ theme }) => ({
    position: 'fixed',             // FABの位置を固定し、スクロールしても動かないようにする。
    bottom: 'calc(50% - 48px)',    // 画面の中央からヘッダーの高さの半分（30px）を差し引いた位置に配置する。
    right: 'calc(50% + 23px)',     // 画面の右から50%の位置に配置する。
    transform: 'translate(50%, 50%)', // 要素を中央に配置するために50%ずつ移動する。
    zIndex: 10,                    // 他の要素よりも前面に表示されるようにZインデックスを設定する。
}));

export default AddButton;
