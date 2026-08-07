import { Heart } from "lucide-react";
import { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
};

const AuthCard = ({ title, description, children, footer }: AuthCardProps) => {
  return (
    <div className="w-full max-w-sm rounded-4xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <Heart
          className="size-10"
          aria-hidden="true"
        />

        <h1 className="text-2xl font-semibold">{title}</h1>

        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {children}

      <div className="mt-6 text-center text-sm text-muted-foreground">
        {footer}
      </div>
    </div>
  );
};

export default AuthCard;
