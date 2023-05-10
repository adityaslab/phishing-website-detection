package minorproject.PhishingDetection.repository;

import minorproject.PhishingDetection.entity.PhishingSiteUrls;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhishingSiteUrlsRepository extends JpaRepository<PhishingSiteUrls, String> {

}
