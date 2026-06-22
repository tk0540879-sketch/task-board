import { useState, useEffect } from "react";

// localStorageの保存キー
const STORAGE_KEY = "taskBoard.tasks";

// localStorageから保存済みタスクを読み込む
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    // 壊れたデータが入っていた場合は空配列で開始する
    console.error("タスクの読み込みに失敗しました", error);
    return [];
  }
}

// タスク1件を表す行コンポーネント
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={"task-item" + (task.completed ? " completed" : "")}>
      {/* チェックボックスで完了・未完了を切り替える */}
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className="task-text">{task.text}</span>
      {/* タスクを削除する */}
      <button className="delete-button" onClick={() => onDelete(task.id)}>
        削除
      </button>
    </li>
  );
}

// アプリ本体
function App() {
  // 初期値はlocalStorageから読み込む（関数を渡して初回のみ実行）
  const [tasks, setTasks] = useState(loadTasks);
  const [inputText, setInputText] = useState(""); // 入力欄の文字列
  // 既存タスクの最大ID+1を次のIDにする（重複を防ぐ）
  const [nextId, setNextId] = useState(
    () => tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1
  );

  // tasksが変わるたびにlocalStorageへ保存する
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // タスクを追加する
  const addTask = () => {
    const trimmedText = inputText.trim();
    if (trimmedText === "") return; // 空文字は追加しない

    const newTask = { id: nextId, text: trimmedText, completed: false };
    setTasks([...tasks, newTask]);
    setNextId(nextId + 1);
    setInputText(""); // 入力欄をクリア
  };

  // Enterキーでも追加できるようにする
  const handleKeyDown = (event) => {
    if (event.key === "Enter") addTask();
  };

  // 完了・未完了を切り替える
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // タスクを削除する
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 残り（未完了）件数
  const remainingCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="container">
      <h1>タスクボード</h1>

      {/* 入力エリア */}
      <div className="input-area">
        <input
          type="text"
          className="task-input"
          placeholder="タスクを入力してください"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="add-button" onClick={addTask}>
          追加
        </button>
      </div>

      {/* タスク一覧 */}
      {tasks.length === 0 ? (
        <p className="empty-message">タスクはありません</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      )}

      {/* 件数表示 */}
      {tasks.length > 0 && (
        <p className="status">
          未完了: {remainingCount} 件 / 全 {tasks.length} 件
        </p>
      )}
    </div>
  );
}

export default App;
