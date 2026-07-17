import {
  getStopImageCommonsUrl,
  stopImages,
  type StopImage,
} from "../data/stopImages";
import { useI18n } from "../i18n";

interface StopPlacePhotoProps {
  stopId: number;
  placeName: string;
}

export function StopPlacePhoto({ stopId, placeName }: StopPlacePhotoProps) {
  const { t, format } = useI18n();
  const image: StopImage | undefined = stopImages[stopId];
  if (!image) return null;

  return (
    <figure className="stop-place-photo mt-4">
      <div className="stop-place-photo__frame">
        <img
          src={image.src}
          alt={format(t.stopDetail.photoAlt, { name: placeName })}
          className="stop-place-photo__img"
          loading="lazy"
          decoding="async"
          width={1200}
          height={800}
        />
      </div>
      <figcaption className="stop-place-photo__caption">
        {image.atmosphere && (
          <span className="stop-place-photo__atmosphere">
            {t.stopDetail.photoAtmosphere}
            {" · "}
          </span>
        )}
        <a
          href={getStopImageCommonsUrl(image)}
          target="_blank"
          rel="noopener noreferrer"
          className="stop-place-photo__credit"
        >
          {format(t.stopDetail.photoCredit, {
            credit: image.credit,
            license: image.license,
          })}
        </a>
      </figcaption>
    </figure>
  );
}
