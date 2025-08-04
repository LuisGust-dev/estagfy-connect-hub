-- Fix security warnings by setting proper search_path for functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (user_id, email, user_type)
  VALUES (
    NEW.id, 
    NEW.email, 
    (NEW.raw_user_meta_data ->> 'user_type')::public.user_type
  );
  
  -- Insert into specific profile table based on user type
  IF (NEW.raw_user_meta_data ->> 'user_type') = 'student' THEN
    INSERT INTO public.student_profiles (user_id, name, course, period)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data ->> 'name', ''),
      COALESCE(NEW.raw_user_meta_data ->> 'course', ''),
      COALESCE(NEW.raw_user_meta_data ->> 'period', '')
    );
  ELSIF (NEW.raw_user_meta_data ->> 'user_type') = 'company' THEN
    INSERT INTO public.company_profiles (user_id, company_name, cnpj, phone, description)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data ->> 'company_name', ''),
      COALESCE(NEW.raw_user_meta_data ->> 'cnpj', ''),
      COALESCE(NEW.raw_user_meta_data ->> 'phone', ''),
      COALESCE(NEW.raw_user_meta_data ->> 'description', '')
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';