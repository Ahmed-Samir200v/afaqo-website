import { ServiceDetailPage, serviceDetailMetadata } from "@/components/sections/services/detail/ServiceDetailPage";
import { serviceDetails } from "@/content/services/details";

const service = serviceDetails["interactive-3d"];
export const metadata = serviceDetailMetadata(service);

export default function Page() {
  return <ServiceDetailPage service={service} />;
}
