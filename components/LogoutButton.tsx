export default function LogoutButton() {
  return (
    <form action='/auth/sign-out' method='post'>
      <button className='rounded-md bg-btn-background px-4 py-2 no-underline hover:bg-btn-background-hover'>
        Logout
      </button>
    </form>
  );
}
