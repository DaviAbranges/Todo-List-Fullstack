export default function Logout() {
  return (
    <div className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-5 mr-5 pr-3">
      <button onClick={() => localStorage.removeItem("token")}>Sair</button>
    </div>
  );
}
