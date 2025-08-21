// src/components/fareEstimation.js

export const servicesConfig = [
  { id: 'auto', name: "Auto", type: 'auto', baseFare: 25, perKm: 10, perMin: 1.5, icon: 'auto.png' },
  // { id: 'cab-non-ac', name: "Cab Non AC", type: 'cab', baseFare: 50, perKm: 15, perMin: 2, icon: 'cabnonAc.png' },
  // { id: 'cab-premium', name: "Cab Premium", type: 'cab', baseFare: 75, perKm: 20, perMin: 2.5, icon: 'cabAc.png' },
  { id: 'bike', name: "Bike", type: 'bike', baseFare: 15, perKm: 8, perMin: 1, icon: 'bike.png' },
  { id: 'scooty', name: "Scooty", type: 'scooty', baseFare: 18, perKm: 9, perMin: 1.2, icon: 'scooty.png' },
  { id: 'parcel', name: "Parcel", type: 'parcel', baseFare: 40, perKm: 12, perMin: 0, icon: 'parcel.png' },
];

export const calculateFare = (distanceKm, durationMins, serviceType) => {
  const service = servicesConfig.find(s => s.name === serviceType);

  if (!service) {
    console.warn(`Service type '${serviceType}' not found.`);
    return { minFare: 0, maxFare: 0 };
  }

  let estimatedFare = service.baseFare + (distanceKm * service.perKm) + (durationMins * service.perMin);
  estimatedFare = Math.round(estimatedFare);

  const minimumFare = 30;
  const finalEstimatedFare = Math.max(estimatedFare, minimumFare);

  const minFare = Math.max(minimumFare, Math.round(finalEstimatedFare * 0.8));
  const maxFare = Math.round(finalEstimatedFare * 1.2);

  return { minFare, maxFare };
};
