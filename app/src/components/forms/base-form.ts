export type BaseFormProps<T> = {
    isLoading?: boolean;
    onSubmit: (data: T) => void;
  };
  