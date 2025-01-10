import { useMutation, useQuery } from "@tanstack/vue-query";
import type { Facturas } from "../../models/facturas";
import QueryService from "../query.service";

export default new (class FacturasService extends QueryService<Facturas> {
  constructor() {
    super(`/bills`, "facturas");
  }
  useValidate() {
    return useMutation({
      mutationKey: [`${this.key}_validate`, "validate"],
      mutationFn: async (number: string) => {
        return await this.service
          .post<null>(`${this.resource}/send/${number}`, number)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw new Error(err.response?.data?.message ?? "An error occurred");
          });
      },
    });
  }

  useVerFactura(
    numero: string,
    options?: {
      refetchOnWindowFocus?: boolean | "always";
      refetchOnMount?: boolean | "always";
      retryOnMount?: boolean;
      enabled?: boolean;
    }
  ) {
    return useQuery({
      queryKey: [`${this.key}_ver`, numero],
      queryFn: async () => {
        return await this.service
          .get<any>(`${this.resource}/download-pdf/${numero}`, {
            responseType: "blob",
          })
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
      },
      ...options,
    });
  }
})();
