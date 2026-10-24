import { ServiceDetailPage, serviceDetailMetadata } from "@/components/sections/services/detail/ServiceDetailPage";
import { serviceDetails } from "@/content/services/details";

const service = serviceDetails["real-time-3d-production"];
export const metadata = serviceDetailMetadata(service);

export default function Page() {
  return <ServiceDetailPage service={service} />;
}
