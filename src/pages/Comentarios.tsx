import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, type PostFormData } from "../schema/postShema";
import { createPost } from "../services/jsonPlaceholder";

export default function PostForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      body: "",
      userId: undefined,
    },
  });

  const [serverResult, setServerResult] = useState<any | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: PostFormData) => {
    setServerResult(null);
    setServerError(null);

    try {
      const payload = {
        title: data.title,
        body: data.body,
        ...(data.userId ? { userId: data.userId } : {}),
      };

      const result = await createPost(payload);
      setServerResult(result);
      reset({ title: "", body: "", userId: undefined });
    } catch (err: any) {
      setServerError(err.message ?? "Error en la petición");
    }
  };

  return (
    <div className="max-w-xl mx-auto pt-7 px-5">
      <div className="bg-[#0D1117] p-8 rounded-xl shadow-2xl border-2 border-blue-900 mx-auto max-w-lg">
    <h2 className="text-3xl font-extrabold mb-6 text-blue-400">Crear Post (JSONPlaceholder)</h2>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
            <label className="block font-semibold mb-2 text-gray-200">Título</label>
            <input
                {...register("title")}
                className="w-full bg-gray-800 border-2 border-blue-600 rounded-lg p-3 text-gray-200 placeholder-gray-500 
                           focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition duration-200"
                placeholder="Título del post"
            />
            {errors.title && (
                <p className="text-red-500 text-sm mt-1 font-medium">{errors.title.message}</p>
            )}
        </div>

        <div>
            <label className="block font-semibold mb-2 text-gray-200">Contenido</label>
            <textarea
                {...register("body")}
                className="w-full bg-gray-800 border-2 border-blue-600 rounded-lg p-3 text-gray-200 placeholder-gray-500 
                           focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition duration-200"
                placeholder="Contenido del post"
                rows={6}
            />
            {errors.body && (
                <p className="text-red-500 text-sm mt-1 font-medium">{errors.body.message}</p>
            )}
        </div>

        <div>
            <label className="block font-semibold mb-2 text-gray-200">User ID (opcional)</label>
            <input
                {...register("userId", { valueAsNumber: true })}
                className="w-32 bg-gray-800 border-2 border-blue-600 rounded-lg p-3 text-gray-200 placeholder-gray-500 
                           focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition duration-200"
                placeholder="1"
                type="number"
                min={1}
            />
            {errors.userId && (
                <p className="text-red-500 text-sm mt-1 font-medium">{errors.userId.message}</p>
            )}
        </div>

        <div className="flex gap-4 pt-2">
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-blue-600/50 
                           hover:bg-blue-500 transition duration-200 disabled:opacity-50 disabled:shadow-none"
            >
                {isSubmitting ? "Enviando..." : "Crear Post"}
            </button>

            <button
                type="button"
                onClick={() => reset({ title: "", body: "", userId: undefined })}
                className="px-6 py-3 rounded-lg border-2 border-gray-600 text-gray-300 bg-gray-700 
                           hover:bg-gray-600 transition duration-200"
            >
                Limpiar
            </button>
        </div>
    </form>

    <div className="mt-8">
        {serverError && (
            <div className="text-red-500 p-3 bg-red-900/30 border border-red-700 rounded-lg">
                <strong>Error del Servidor:</strong> {serverError}
            </div>
        )}

        {serverResult && (
            <div className="mt-4 p-4 border border-blue-600 rounded-lg bg-gray-900 shadow-inner">
                <h3 className="font-bold text-blue-400 text-lg border-b border-blue-800 pb-2">Respuesta del servidor</h3>
                <pre className="text-sm overflow-auto text-gray-300 mt-3">
                    {JSON.stringify(serverResult, null, 2)}
                </pre>
                <p className="text-xs text-gray-500 mt-3">
                    Nota: JSONPlaceholder retorna un objeto simulado con un `id` nuevo.
                </p>
            </div>
        )}
    </div>
</div>
    </div>
  );
}
