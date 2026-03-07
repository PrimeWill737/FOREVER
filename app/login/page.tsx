import { AdminLoginForm } from '@/components/admin/AdminLoginForm';

export default function LoginPage() {
  return (
    <div className="admin-login">
      <div className="admin-login__box">
        <h1 className="admin-login__title">Admin</h1>
        <p className="admin-login__subtitle">William & Esther</p>
        <AdminLoginForm />
      </div>
    </div>
  );
}
