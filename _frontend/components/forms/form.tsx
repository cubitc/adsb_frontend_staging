import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import type { ZodType } from "zod";

type ServerErrors<T> = {
  [Property in keyof T]: string;
};

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  useFormProps?: UseFormProps<TFormValues>;
  validationSchema?: ZodType<TFormValues, any, any>;

  fieldErrors?: any[] | null;
  formError?: string | string[] | null | any;
  serverError?: ServerErrors<Partial<TFormValues>> | null;
  resetValues?: any | null;
  values?: Partial<TFormValues> | null;
  className?: string;
};

export const Form = <
  TFormValues extends Record<string, any> = Record<string, any>
>({
  onSubmit,
  children,
  useFormProps,
  validationSchema,
  resetValues,
  className,
  values,
  ...formProps
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    ...useFormProps,
    ...(validationSchema && {
      resolver: zodResolver(validationSchema),
      delayError: 300,
    }),
  });

  useEffect(() => {
    if (resetValues) {
      methods.reset(resetValues);
    }
  }, [resetValues, methods]);
  useEffect(() => {
    if (values && Object.keys(values).length) {
      methods.reset(
        { ...(methods.getValues() as TFormValues), ...values },
        { keepDirtyValues: true, keepTouched: true }
      );
    }
  }, [values, methods]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        {...formProps}
        className={className}
        noValidate
      >
        {children(methods)}
      </form>
    </FormProvider>
  );
};
