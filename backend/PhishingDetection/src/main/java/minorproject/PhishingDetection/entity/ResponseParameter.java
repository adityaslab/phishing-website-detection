package minorproject.PhishingDetection.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseParameter {
    private Integer longURL;
    private Integer shortURL;
    private Integer preffixSuffix;
    private Integer https;
    private Integer usingIp;
    private Integer symbol;
}
