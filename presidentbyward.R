presidentbyward <- function(year, ward) {
  library(plyr)
  ## Read election data per ward
  election <- read.csv(paste(year,"_general.csv", sep=""), header = TRUE, na.strings = "Not Available", stringsAsFactors = FALSE)
  president <- subset(election, OFFICE == "PRESIDENT AND VICE PRESIDENT OF THE UNITED STATES")
  ward <- subset(president, WARD == ward)
  totals <- ddply(ward, .(WARD, PARTY, CANDIDATE), colwise(sum, c("VOTES")))
  totals
}