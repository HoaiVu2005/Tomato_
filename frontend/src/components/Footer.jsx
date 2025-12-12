import React from "react";

const Footer = ({ ActiveCount, CompletedCount }) => {
  return (
    <>
      {CompletedCount + ActiveCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {CompletedCount > 0 && (
              <>
                Tuyệt vời bạn đã hoàn thành {CompletedCount} việc{" "}
                {ActiveCount > 0 && `, còn ${ActiveCount} nữa thôi !!!`}
              </>
            )}
            {CompletedCount === 0 && ActiveCount > 0 && (
              <>Hãy bắt đầu làm {ActiveCount} nhiệm vụ nào !!!</>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
