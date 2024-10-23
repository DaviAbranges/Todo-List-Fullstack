export default function Logout() {
  return (
    <>
      <button onClick={() => localStorage.removeItem("token")}>Sair</button>
    </>
  );
}
